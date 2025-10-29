import React from "react";
import { useNavigate } from "react-router-dom";

export default function TradingPlatform() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Trading Platform</h1>
          <p className="text-sm text-muted-foreground">Integrated trading desk</p>
        </div>
        <div>
          <button
            className="btn"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      </div>

      <div style={{ height: "80vh", borderRadius: 8, overflow: "hidden" }}>
        <iframe
          title="Trading Platform"
          src="/tradingPlatform.html"
          style={{ width: "100%", height: "100%", border: "none" }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
