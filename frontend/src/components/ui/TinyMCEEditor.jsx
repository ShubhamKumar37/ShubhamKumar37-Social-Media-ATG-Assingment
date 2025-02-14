import { useRef } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCEEditor({ control, handleSubmit, name, defaultValue, divCss = "" }) {
    const editorRef = useRef(null);

    // On form submission, log the content
    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const apiKey = process.env.REACT_APP_TINY_API_KEY;

    return (
        <div className={`${divCss}`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue || "<p>This is the initial content of the editor.</p>"}
                    render={({ field }) => (
                        <Editor
                            apiKey={apiKey}
                            value={field.value}
                            onEditorChange={(newValue) => field.onChange(newValue)}
                            onInit={(_evt, editor) => (editorRef.current = editor)}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                    )}
                />

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
