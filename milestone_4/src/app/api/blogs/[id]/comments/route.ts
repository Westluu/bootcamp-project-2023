import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/helper/db"
import Blogs from "@/database/blogSchema";


type IParams = {
		params: {
			id: string
		}
}

/* 
	In order to use params, you need to have a request parameter before

	The reason why we do { params }, is to destructure, the object, meaning,
	it allows us to obtain the individual properties within the "IParams" 
	object directly and conveniently, 
	such as the `params` property.

	If we didn't do this, to obtain slug would look messy,
	ex.
	const slug = params.params.slug

	There are more ways to destructure this, but that is up to you to find out
	lol.

*/

export async function POST(req: NextRequest, { params }: IParams) {
    await connectDB(); // function from db.ts before
	const { id } = params; // another destructure
    const body = await req.json();
    
	try {
		console.log("IN API FOR BLOG POST");
        const new_comment = {user: body.user, comment: body.comment, date: new Date(body.date)};
		const blog = await Blogs.findOne({slug: `./blogs/${id}` }).orFail();
        blog.comments.push(new_comment);
        blog.save();
		return NextResponse.json(blog, {status: 200});
	} catch (err) {
		console.log("IN GET ERROR");
		return NextResponse.json('Blog not found.', { status: 404 });
	}
}
