type Props = {
  title: string;
  className?: string;
};
export default function SectionTitle({ title, className }: Props) {
  return <h2 className={`mb-6 text-2xl sm:text-3xl font-bold ${className}`}>{title}</h2>;
}
