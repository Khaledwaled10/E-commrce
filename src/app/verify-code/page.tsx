"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form, FormField, FormItem, FormLabel, FormMessage, FormControl,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const verifySchema = z.object({
  resetCode: z.string().min(5, "Code must be at least 6 digits"),
});
type VerifyForm = z.infer<typeof verifySchema>;

export default function VerifyCodePage() { 
          const router = useRouter();
    
  const form = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
    defaultValues: { resetCode: "" },
  });

  
  async function onSubmit(values: VerifyForm) {
    const res = await fetch("/api/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (res.ok) {
      toast.success("Code verified successfully");
      router.push("/reset-password");
    } else {
      toast.error(data.message || "Invalid code");
    }
  }
  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-xl font-bold mb-5">Verify Reset Code</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl><Input type="text" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-main text-white">
            Verify Code
          </Button>
        </form>
      </Form>
    </div>
  );
}
