// import { useEffect } from "react";

// export function useWebSocket(onMessage) {
//   useEffect(() => {
//     const socket = new WebSocket("wss://ts9cmsgs7j.execute-api.eu-west-2.amazonaws.com/prod/");

//     socket.onopen = () => console.log("✅ Connected to WebSocket");
//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log("📡 WebSocket message:", data);
//         onMessage(data);
//       } catch (err) {
//         console.error("Error parsing WebSocket message:", err);
//       }
//     };

//     socket.onclose = () => console.log("🔌 WebSocket closed");
//     socket.onerror = (err) => console.error("⚠️ WebSocket error:", err);

//     return () => socket.close();
//   }, [onMessage]);
// }
