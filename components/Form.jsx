import Link  from "next/link";

const FormComponent = ({ type, post, setPost, submitting, handleSubmit }) => {

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} & share amazing prompts with the world, and let your imagination
        run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
        </label>
        <textarea
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          value={post.prompt}
          required
          placeholder="Write Your Prompt Here"
          className="form_textarea"
        />
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {`  `}{" "}
            <span className="font-normal">
              (#product, #physics, #webdevelopment)
            </span>
          </span>
        </label>
        <input
          type="text"
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          value={post.tag}
          required
          placeholder="#tag"
          className="form_input"
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm border border-slate-100 text-gray-600 hover:text-gray-900">
            Clear
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing ...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormComponent;
