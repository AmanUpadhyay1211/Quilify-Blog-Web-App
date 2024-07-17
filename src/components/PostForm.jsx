import React, { useCallback, useEffect, useState } from 'react';
import { RealTimeEditor, Btn, Input, Select } from "./index";
import managePostService from '../appwrite/managePostService';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PostForm({ post }) {
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const { register, setValue, watch, handleSubmit, formState: { errors, isSubmitting }, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const submit = async (data) => {
        setError("");
        try {
            if (post) {
                const oldImg = await managePostService.deleteFile(post.imageID);
                const newImg = data.image[0] && await managePostService.uploadFile(data.image[0]);
                if (newImg && oldImg) {
                    const updatedPost = await managePostService.updatePost({ slug: post.$id, title: data.title, content: data.content, imageID: newImg.$id,likedBy : post.likedBy });
                    if (updatedPost) {
                        navigate(`/post/${updatedPost.$id}`);
                    }
                }
            } else {
                const newImg = data.image[0] && await managePostService.uploadFile(data.image[0]);
                if (newImg) {
                    const newPost = await managePostService.createPost({ slug: data.slug, title: data.title, content: data.content, imageID: newImg.$id, userID: userData.$id, userName: userData.name, status: data.status });
                    newPost && navigate(`/post/${newPost.$id}`);
                }
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const slugMaker = useCallback((title) => {
        title = title.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')  // Replace non-alphanumeric characters with '*'
            .replace(/\s+/g, '-');         // Replace spaces with '-'
        return title;
    }, []);


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugMaker(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, setValue, slugMaker]);

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(submit)}>
                <div className="mb-4">
                    <Input
                        label="Title:"
                        placeholder="Enter the Title"
                        {...register("title", { required: "This field is required", minLength: { value: 4, message: "Too short" }, maxLength: { value: 30, message: "Title should not be that long" } })}
                        onInput={(e) => {
                            setValue("slug", slugMaker(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div className="mb-4">
                    <Input
                        label="Slug ID:"
                        placeholder="Enter the Title"
                        {...register("slug", { required: true })}
                        disabled={true}
                    />
                </div>
                <div className="mb-4">
                    <RealTimeEditor label="Content" name="content" defaultValue='' control={control} />
                </div>
                <div className="mb-4">
                    <Input
                        label="Featured Image:"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </div>
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={managePostService.getFilePreview(post.imageID)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        {...register("status", { required: true })}
                    />
                </div>
                <div className="mb-4">
                    <Btn type="submit" disabled={isSubmitting}>{post ? "Update" : "Submit"}</Btn>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
}

export default PostForm;
