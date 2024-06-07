export default function PageTitle({ title }) {
  return (
    <div>
      <h2 className="text-2xl my-2 font-bold sm:text-start text-center">
        {title}
      </h2>
      <hr className="mb-5 border-slate-400 dark:border-slate-600" />
    </div>
  );
}
