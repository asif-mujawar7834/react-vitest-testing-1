import { delay, http, HttpResponse } from "msw";

export const handlers = [
  // Intercept the "GET /resource" request.
  http.get("http://localhost:3030/scoops", async () => {
    // And respond with a "text/plain" response
    // with a "Hello world!" text response body.
    return HttpResponse.json([
      {
        name: "Chocolate",
        image: "/image/chocolate.png",
      },
      {
        name: "Vanilla",
        image: "/image/vanilla.png",
      },
    ]);
  }),

  http.get("http://localhost:3030/toppings", async () => {
    return HttpResponse.json([
      {
        name: "Cherries",
        imagePath: "/images/cherries.png",
      },
      {
        name: "M&S",
        imagePath: "/images/ms.png",
      },
      {
        name: "Hot Fudge",
        imagePath: "/images/hotfudge.png",
      },
    ]);
  }),

  http.post("http://localhost:3030/order", async () => {
    await delay(400);
    return HttpResponse.json({
      orderNumber: 6632776565,
    });
  }),
];
