import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const genders = ["Male", "Female", "Other"] as const;

const ParticipantSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  age: z
    .number({ invalid_type_error: "Age is required" })
    .int()
    .min(10, "Minimum age is 10")
    .max(99, "Maximum age is 99"),
  gender: z.enum(genders, { required_error: "Gender is required" }),
  // Phones are optional on each participant; we'll enforce captain's primary phone below
  primaryPhone: z.string().optional().or(z.literal("")),
  secondaryPhone: z.string().optional().or(z.literal("")),
});

const RegistrationSchema = z
  .object({ participants: z.array(ParticipantSchema).min(1).max(4) })
  .refine(
    (data) => {
      const captain = data.participants[0];
      return Boolean(
        captain?.primaryPhone && captain.primaryPhone.trim().length > 0
      );
    },
    {
      message: "Primary phone for team captain is required",
      path: ["participants", "0", "primaryPhone"],
    }
  );

type RegistrationForm = z.infer<typeof RegistrationSchema>;

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: { participants: [] },
    mode: "onTouched",
  });

  const { handleSubmit, control, reset, getValues } = form;

  function startStep2(selectedCount: number) {
    setCount(selectedCount);

    const defaults = Array.from({ length: selectedCount }).map(() => ({
      fullName: "",
      age: 18,
      gender: "Male" as (typeof genders)[number],
      primaryPhone: "",
      secondaryPhone: "",
    }));

    reset({ participants: defaults });
    setStep(2);
  }

  function onBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function onNextFromStep2() {
    // Trigger validation across the form for step 2 fields
    handleSubmit(() => setStep(3))();
  }

  // 1. Updated Submission Logic
  async function handlePaymentAndSubmit() {
    // 1. Generate IDs locally so we can show them to the user
    const generatedTeamId =
      "TEAM-" + Math.random().toString(36).substr(2, 6).toUpperCase();

    toast({
      title: "Processing registration...",
      description: "Please do not close the window.",
    });
    setIsSubmitting(true);
    try {
      // 2. Simulate Payment Delay
      await new Promise((r) => setTimeout(r, 1000));

      // 3. Submit to Google Sheets
      const formData = getValues();
      await submitToGoogleSheets(formData, generatedTeamId);

      // 4. Success UI
      toast({
        title: "Registration Successful!",
        description: `Your Team ID is: ${generatedTeamId}`,
      });

      reset({ participants: [] });
      setCount(null);
      setStep(1);
    } catch (err: any) {
      setIsSubmitting(false);
      console.error("Submission error", err);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Could not connect to the registration server.",
      });
    }
  }

  // 2. Updated API call to Google Apps Script
  async function submitToGoogleSheets(data: RegistrationForm, teamId: string) {
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      throw new Error("Google Script URL is missing");
    }

    // We use fetch with 'no-cors'. This sends the data but doesn't let us read the response.
    // This is the most stable way to handle high-traffic Google Script hits.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamId: teamId, // Pass the ID we generated
        participants: data.participants,
        paymentStatus: "Paid",
      }),
    });

    return { result: "success" };
  }

  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h1 className="font-display text-2xl mb-2">
              Vibe Coding Challenge — Team Registration
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Code. Create. Connect. — Offline @ Brocamp Kochi • 24 Hours
            </p>

            {/* Landscape layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <aside className="md:col-span-1 md:sticky md:top-24 md:w-80">
                <div className="p-5 border rounded-lg mb-5 bg-card/60 shadow-sm">
                  <h3 className="font-semibold text-lg">Event Info</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Quick links: full rules, schedule, and submission checklist
                    are on the main event page.
                  </p>
                  <div className="mt-3 space-y-2">
                    <a href="/" className="text-sm text-primary underline">
                      View Event Details
                    </a>
                    <a
                      href="/"
                      className="text-sm text-muted-foreground underline"
                    >
                      Rules & Schedule
                    </a>
                  </div>
                </div>

                <ol className="mt-5 space-y-3">
                  <li className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/40"
                      }`}
                    >
                      1
                    </div>
                    <div>
                      <div className="font-medium">Count</div>
                      <div className="text-sm text-muted-foreground">
                        Select number of participants
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === 2
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/40"
                      }`}
                    >
                      2
                    </div>
                    <div>
                      <div className="font-medium">Details</div>
                      <div className="text-sm text-muted-foreground">
                        Fill participant information
                      </div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === 3
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/40"
                      }`}
                    >
                      3
                    </div>
                    <div>
                      <div className="font-medium">Review</div>
                      <div className="text-sm text-muted-foreground">
                        Confirm & submit payment
                      </div>
                    </div>
                  </li>
                </ol>

                <div className="mt-3 p-5 border rounded-lg bg-card/60 shadow-sm">
                  <div className="text-sm text-muted-foreground">
                    Team Members
                  </div>
                  <div className="mt-3 space-y-2">
                    {getValues().participants?.length ? (
                      getValues().participants.map((p, i) => (
                        <div key={i} className="text-sm">
                          <strong>
                            {i === 0 ? "Team Captain" : `Member ${i}`}
                          </strong>
                          <div className="text-xs text-muted-foreground">
                            {p.fullName || "—"}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        None selected
                      </div>
                    )}
                  </div>
                </div>
              </aside>

              <main className="md:col-span-2">
                <div className="bg-card p-6 rounded-lg shadow-md max-w-4xl mx-auto">
                  {step === 1 && (
                    <div>
                      <p className="mb-4">
                        Select number of participants (1-4)
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((n) => (
                          <button
                            key={n}
                            type="button"
                            aria-pressed={count === n}
                            onClick={() => startStep2(n)}
                            className={`flex flex-col items-center justify-center w-full p-6 min-h-[96px] rounded-lg transition-shadow text-center ${
                              count === n
                                ? "bg-primary/10 border border-primary shadow-md scale-105"
                                : "bg-card/50 border border-border hover:shadow-sm"
                            }`}
                          >
                            <div className="text-3xl font-bold">{n}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {n === 1
                                ? "Solo (Captain only)"
                                : `${n} participants`}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <Form {...form}>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-6">
                          <p className="text-sm text-muted-foreground">
                            Fill in participant details. The first participant
                            is the <strong>Team Captain</strong>.
                          </p>

                          <p className="text-sm text-muted-foreground mt-1">
                            <strong>Only the team captain</strong> needs to
                            provide contact numbers.
                          </p>

                          {Array.from({ length: count ?? 0 }).map((_, idx) => (
                            <section
                              key={idx}
                              className={`p-5 border rounded-lg ${
                                idx === 0 ? "ring-2 ring-primary/10" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg">
                                  {idx === 0
                                    ? "Team Captain"
                                    : `Team Member ${idx}`}
                                </h3>
                                <div className="text-sm text-muted-foreground">
                                  #{idx + 1}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={control}
                                  name={`participants.${idx}.fullName` as const}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Full Name</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Full name"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={control}
                                    name={`participants.${idx}.age` as const}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Age</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            min={10}
                                            max={99}
                                            {...field}
                                            onChange={(e) =>
                                              field.onChange(
                                                Number(e.target.value || 0)
                                              )
                                            }
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={control}
                                    name={`participants.${idx}.gender` as const}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                          <select
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground"
                                            {...field}
                                          >
                                            {genders.map((g) => (
                                              <option key={g} value={g}>
                                                {g}
                                              </option>
                                            ))}
                                          </select>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              {idx === 0 ? (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={control}
                                    name={
                                      `participants.${idx}.primaryPhone` as const
                                    }
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Primary Phone Number{" "}
                                          <span className="text-xs text-muted-foreground">
                                            (Must have WhatsApp)
                                          </span>
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Primary phone"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={control}
                                    name={
                                      `participants.${idx}.secondaryPhone` as const
                                    }
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Secondary Phone Number (optional)
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Secondary phone"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              ) : null}
                            </section>
                          ))}

                          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
                            <div className="w-full sm:w-auto">
                              <Button
                                variant="ghost"
                                onClick={onBack}
                                className="w-full sm:w-auto"
                              >
                                Back
                              </Button>
                            </div>
                            <div className="w-full sm:w-auto">
                              <Button
                                onClick={onNextFromStep2}
                                className="w-full sm:w-auto"
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </Form>
                  )}

                  {step === 3 && (
                    <div>
                      <h2 className="font-semibold mb-4">Review & Complete</h2>

                      <div className="space-y-4">
                        {getValues().participants.map((p, i) => (
                          <div
                            key={i}
                            className="p-4 border rounded-lg bg-background/50"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <strong>
                                  {i === 0
                                    ? "Team Captain"
                                    : `Team Member ${i}`}
                                </strong>
                                <div className="text-sm text-muted-foreground">
                                  {p.fullName}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Age: {p.age}
                              </div>
                            </div>
                            <div className="mt-2 text-sm">
                              <div>{p.gender}</div>
                              {i === 0 && <div>Primary: {p.primaryPhone}</div>}
                              {i === 0 && p.secondaryPhone && (
                                <div>Secondary: {p.secondaryPhone}</div>
                              )}
                            </div>
                          </div>
                        ))}

                        <div className="p-6 border rounded-lg bg-card/70">
                          <h3 className="font-medium mb-2">Payment</h3>
                          {/* <p className="text-sm text-muted-foreground mb-4">
                            Placeholder: Payment gateway integration will be
                            added later.
                          </p> */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="w-full sm:w-auto">
                              <Button
                                variant="ghost"
                                onClick={() => setStep(2)}
                                className="w-full sm:w-auto"
                              >
                                Back
                              </Button>
                            </div>
                            <div className="w-full sm:w-auto">
                              <Button
                                onClick={handlePaymentAndSubmit}
                                disabled={isSubmitting}
                              >
                                {isSubmitting
                                  ? "Submitting..."
                                  : "Pay & Submit"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
