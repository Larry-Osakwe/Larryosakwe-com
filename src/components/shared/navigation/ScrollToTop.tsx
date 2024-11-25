import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpToLine } from "lucide-react";
import tw, { styled } from 'twin.macro';

const ScrollButton = styled(Button)`
  ${tw`fixed bottom-4 right-4 opacity-90 shadow-md`}
`;
const ScrollIcon = styled(ArrowUpToLine)`
  ${tw`h-4 w-4`}
`;

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      {showTopBtn && (
        <ScrollButton
          onClick={goToTop}
          size="icon"
        >
          <ScrollIcon />
        </ScrollButton>
      )}
    </>
  );
};