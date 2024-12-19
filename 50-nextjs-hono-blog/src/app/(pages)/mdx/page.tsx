import Content from '@/_mdx/welcome.mdx';
import "@/styles/markdownhere.css";

export default async function Page() {

    return (
        <div className='w-1/2'>
            <Content />
        </div>
    );
}
