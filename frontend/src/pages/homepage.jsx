export default function HomePage() {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Mini Quiz
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              Smart and Fun{" "}
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed">
            Careful, Precise, and Create Happiness with Riddles! Our Mini Quiz
            is ready to test your knowledge and cleverness, while providing
            unexpected fun at every step!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/play"
            >
              start playing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
