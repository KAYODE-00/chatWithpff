"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Zap, Loader2 } from "lucide-react";

type Props = { isPro: boolean };

const SubscriptionButton = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={handleSubscription}
      className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin text-zinc-400" />
      ) : (
        <Zap className="w-3.5 h-3.5 mr-1.5 text-zinc-300 fill-zinc-300" />
      )}
      {props.isPro ? "Manage Subscription" : "Upgrade to Pro"}
    </Button>
  );
};

export default SubscriptionButton;
