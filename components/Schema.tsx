import script from "next/script";

type Props = {
    data: Record<string, any> | Record<string, any>[];
};

export default function Schema({ data }: Props) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
