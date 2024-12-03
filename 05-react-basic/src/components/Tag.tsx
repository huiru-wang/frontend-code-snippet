export const Tag: React.FC<{ tag: string }> = ({ tag }) => {
    return (
        <div className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 mb-2 text-gray-500 no-underline text-sm ">
            #{tag}
        </div>
    )
}