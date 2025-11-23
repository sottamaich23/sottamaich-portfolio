type BadgeProps = {
  children: React.ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md border border-foreground/10 bg-foreground/5 px-2.5 py-1 text-xs text-foreground/80">
      {children}
    </span>
  );
}


