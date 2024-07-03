export default function SectionTitle(props: { title: string }) {
  return (
    <div className="sm:text-5xl text-3xl w-full">
      {props.title.toUpperCase()}
      <hr className="w-full my-4" />
    </div>
  );
}
