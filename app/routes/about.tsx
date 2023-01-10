import { useLoaderData } from "@remix-run/react";

export async function loader({}) {
  return {
    ENV: {
      ABOUT_EMAIL: process.env.BLOG_ABOUT_EMAIL,
    },
  };
}

const AboutPage = () => {
  const { ENV } = useLoaderData<typeof loader>();
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl text-gray-800 font-bold mb-4 text-center">About Us</h1>
          <p className="text-gray-700 mb-4">
            Thank you for reading my blog. I hope you enjoyed it. If you have
            any questions or comments, please feel free to contact me via email,
            and I'll get back to you as soon as I can.
          </p>
          <div className="flex flex-col items-center justify-between">
            <h2 className="text-lg text-gray-800 font-bold mb-4">Contact Us</h2>
            <div className="text-gray-700 mb-4">
              <p>
                Email:{" "}
                <a href={`mailto:${ENV.ABOUT_EMAIL}`}>{ENV.ABOUT_EMAIL}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
