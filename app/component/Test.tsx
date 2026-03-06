import { useMemo, memo } from "react";
import { ContentData } from "../test/page";

export default memo(function Test({
    count = 20,
    handleContentChange
}: {
    count?: number;
    handleContentChange: (field: keyof ContentData, value: string) => void;
}) {
    console.log('Test component');
    const arr = useMemo(() => {
        console.log('Test useMemo');
        return Array.from({ length: count }, (_, index) => {
            return index;
        });
    }, []);

    return <div>
        {arr.map((item) => {
            return <div key={item}>{item}</div>;
        })}
    </div>;
});