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
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirectTo') || '/dashboard';

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await signInAuth(signIn.email, signIn.password);
        if (error?.code === 'unverified_email') {
            router.push(`/verify-info?email=${encodeURIComponent(signIn.email)}`);
            return;
        }
        if (error) {
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
                redirectTo: `${location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (error) {
            console.error('Google OAuth error:', error);
        }

        toasterMessage("Welcome to NiceNote.ai", "🔥");
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await signUpAuth(signUp.name, signUp.email, signUp.password);
        if (error) {
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
                            <Button variant="outline" className="w-full font-bold cursor-pointer" onClick={handleSignInGoogle}>
                                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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