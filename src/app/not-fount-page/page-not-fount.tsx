import React from "react";

const PageNotFount = () => {
  React.useEffect(() => {
    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;

    // Create stars background
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      const size = `${Math.random() * 3}px`;
      star.style.width = size;
      star.style.height = size;
      star.style.setProperty("--duration", `${Math.random() * 3 + 1}s`);
      starsContainer.appendChild(star);
    }

    // Create meteors at intervals
    const meteorInterval = setInterval(() => {
      const meteor = document.createElement("div");
      meteor.className = "meteor";
      meteor.style.top = `${Math.random() * 100}%`;
      meteor.style.left = "100%";
      document.body.appendChild(meteor);

      setTimeout(() => meteor.remove(), 2000);
    }, 3000);

    // Space key easter egg
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        document.body.style.background = `hsl(${
          Math.random() * 360
        }, 50%, 15%)`;
        setTimeout(() => (document.body.style.background = ""), 500);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      clearInterval(meteorInterval);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* <!-- Stars Background --> */}
      <div id="stars" className="fixed inset-0 z-10"></div>

      {/* <!-- Main Content --> */}
      <div className="error-container relative z-10 text-center">
        {/* <!-- UFO with Beam --> */}
        <div className="relative space-animation mb-8">
          <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
            {/* <!-- UFO Body --> */}
            <ellipse cx="50" cy="40" rx="30" ry="10" fill="#4F46E5" />
            <circle cx="50" cy="35" r="20" fill="#818CF8" />
            <ellipse cx="50" cy="30" rx="10" ry="5" fill="#C7D2FE" />
            {/* <!-- Beam --> */}
            <path
              className="ufo-beam"
              d="M40 40 L30 80 L70 80 L60 40"
              fill="rgba(79, 70, 229, 0.2)"
            />
          </svg>
        </div>

        {/* <!-- 404 Text --> */}
        <h1 className="text-8xl font-bold text-white mb-4 space-animation">
          4<span className="inline-block portal">0</span>4
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          Oops! Looks like you've wandered into space!
        </p>

        {/* <!-- Interactive Elements --> */}
        <div className="space-y-4">
          {/* <!-- Hidden Portfolio Link --> */}
          {/* <a
          href="https://abhirajk.vercel.app"
          className="hidden-link text-blue-400 hover:text-blue-300 transition block"
        >
          ← Find your way back to safety
        </a> */}
          {/* <!-- Action Buttons --> */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              // onClick="window.history.back()"
              className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transform hover:scale-105 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFount;
