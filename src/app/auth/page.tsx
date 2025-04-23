'use client'

import { Suspense, useState } from "react";
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInAuth, signUpAuth } from "@/lib/supabase/auth";
import { supabase } from "@/lib/supabase/client";
import { toasterMessage } from "@/lib/toaster";

export default function Auth() {
    const [signIn, setSignIn] = useState({ email: "", password: "" });
    const [signUp, setSignUp] = useState({ name: "", email: "", password: "" });
    const [, setError] = useState('');
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await signInAuth(signIn.email, signIn.password);
        if (error?.code === 'unverified_email') {
            router.push(`/verify-info?email=${encodeURIComponent(signIn.email)}`);
            return;
        }
        if (error) {
            toasterMessage(error.message, "🥲");
            setError(error.message);
        } else {
            toasterMessage("Welcome to NiceNote.ai", "🔥");
            router.push('/dashboard');
        }
    };

    const handleSignInGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback?redirectTo=${encodeURIComponent("/dashboard")}`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (error) {
            toasterMessage(error.message, "🥲");
            console.error('Google OAuth error:', error);
        }

        toasterMessage("Welcome to NiceNote.ai", "🔥");
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await signUpAuth(signUp.name, signUp.email, signUp.password);
        if (error) {
            toasterMessage(error.message, "🥲");
            setError(error.message);
            return;
        }
        if (data.user) {
            router.push(`/verify-info?email=${encodeURIComponent(signUp.email)}`);
        }
    };

    return (
        <Suspense fallback={<div className="text-center text-xl p-4">Loading...</div>}>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4 font-[family-name:var(--font-catamaran)]">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-center">NiceNote.ai</CardTitle>
                        <CardDescription className="text-xl text-center">
                            Choose your preferred sign in method
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4">
                            <Button
                                variant="outline"
                                className="w-full font-bold cursor-pointer"
                                onClick={handleSignInGoogle}
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign In with Google
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>
                        <Tabs defaultValue="signin" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="signin" className="font-bold cursor-pointer">Sign In</TabsTrigger>
                                <TabsTrigger value="signup" className="font-bold cursor-pointer">Sign Up</TabsTrigger>
                            </TabsList>
                            <TabsContent value="signin" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Enter your email"
                                        value={signIn.email}
                                        onChange={(e) => setSignIn(prev => ({ ...prev, email: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="Enter your password"
                                        value={signIn.password}
                                        onChange={(e) => setSignIn(prev => ({ ...prev, password: e.target.value }))} />
                                </div>
                                <Button onClick={handleSignIn} className="w-full font-bold cursor-pointer">Sign In</Button>
                            </TabsContent>
                            <TabsContent value="signup" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter your full name"
                                        value={signUp.name}
                                        onChange={(e) => setSignUp(prev => ({ ...prev, name: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Enter your email"
                                        value={signUp.email}
                                        onChange={(e) => setSignUp(prev => ({ ...prev, email: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" placeholder="Create a password"
                                        value={signUp.password}
                                        onChange={(e) => setSignUp(prev => ({ ...prev, password: e.target.value }))} />
                                </div>
                                <Button onClick={handleSignUp} className="w-full font-bold cursor-pointer">Create Account</Button>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-sm text-center text-gray-500">
                            By continuing, you agree to our{" "}
                            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
                            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </Suspense>
    );
}