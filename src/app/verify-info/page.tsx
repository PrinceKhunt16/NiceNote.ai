"use client";

import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

function VerifyInfoContent() {
    const [params, setParams] = useState<URLSearchParams | null>(null);
    const email = params?.get("email")

    useEffect(() => {
      setParams(new URLSearchParams(window.location.search));
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-[family-name:var(--font-catamaran)]">
            <Card className="w-full max-w-md mx-4">
                <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Check your email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center space-y-2">
                        <p className="text-gray-600">
                            We have sent a verification link to{" "}
                            <span className="font-semibold text-gray-900">{email}</span>.
                            Please check your inbox and click the link to verify your email address.
                        </p>
                        <p className="text-sm text-gray-500">
                            If you do not see the email, check your spam folder.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button className="w-full" asChild>
                            <Link href="/auth">
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Back to Sign In
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function VerifyInfoClient() {
    return (
        <Suspense fallback={<div className="text-center text-xl p-4">Loading...</div>}>
            <VerifyInfoContent />
        </Suspense>
    );
}
