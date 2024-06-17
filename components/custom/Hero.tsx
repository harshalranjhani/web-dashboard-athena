"use client";
import { Button } from "@/components/ui/button";
import Globe from "./Globe";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-32 flex flex-col items-center justify-center min-h-screen">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
        </div>
        {/* End Gradients */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="">A project by Yug Foundation</p>
              {/* Title */}
              <div className="mt-5 max-w-2xl mx-auto">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Athena
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl mx-auto">
                <p className="text-xl text-muted-foreground">
                  We at YUG Foundation work towards bringing to life and meaning to our motto Sahyog, Seva, Samarpan.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 gap-3 flex justify-center">
                <Button size={"lg"} onClick={()=>{
                  router.push('/dashboard')
                }}>Get started</Button>
                <Button size={"lg"} variant={"outline"}>
                  Learn more
                </Button>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
        <div className="w-[100vw] flex items-center justify-center">
          <Globe />
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
