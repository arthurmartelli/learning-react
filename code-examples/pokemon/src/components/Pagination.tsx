/**
 * Renders a pagination component with "Previous" and "Next" buttons.
 *
 * Props:
 * - gotoNextPage: A function that should be called when the "Next" button is clicked. If this prop is null, the "Next" button will not be rendered.
 * - gotoPrevPage: A function that should be called when the "Previous" button is clicked. If this prop is null, the "Previous" button will not be rendered.
 *
 * Example usage:
 * ```tsx
 * <Pagination gotoPrevPage={handlePrevPage} gotoNextPage={handleNextPage} />
 * ```
 */
export default function Pagination({
  gotoNextPage,
  gotoPrevPage,
}: {
  gotoNextPage: (() => void) | null;
  gotoPrevPage: (() => void) | null;
}): JSX.Element {
  return (
    <div>
      {/* if we have a function to go to the previous page, show a button  */}
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  );
}
