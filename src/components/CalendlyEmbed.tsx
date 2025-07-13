import { useEffect } from "react";

export default function CalendlyEmbed() {
  useEffect(() => {
    // Only add the script if it hasn't been added yet
    if (!document.getElementById("calendly-widget-script")) {
      const script = document.createElement("script");
      script.id = "calendly-widget-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-[500px] h-[525px] scale-[80%] flex items-center justify-center overflow-clip bg-white mt-[-10%]"  style={{ borderRadius: "20px" }}>
      <div className="w-full h-[525px]" style={{ borderRadius: "20px" }}>
        <iframe src="https://calendly.com/drebarrera/chat?embed_domain=localhost%3A3000&amp;embed_type=Inline&amp;hide_event_type_details=1&amp;hide_gdpr_banner=1" width="100%" height="100%" title="Select a Date &amp; Time - Calendly"></iframe>
      </div>
    </div>
  );
}