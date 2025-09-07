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

const resetSchema = z.object({
  email: z.string().email("Invalid email"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
type ResetForm = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
const router=useRouter()
    const form = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "", newPassword: "" },
  });

async function onSubmit(values: ResetForm) {
    const res = await fetch("/api/auth/reset-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (res.ok) {
      toast.success("Password reset successfully");
      router.push("/auth/login");
    } else {
      toast.error(data.message || "Something went wrong");
    }
  }



  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-xl font-bold mb-5">Reset Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl><Input type="password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-main text-white">
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
