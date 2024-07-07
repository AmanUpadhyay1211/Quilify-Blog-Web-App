import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RealTimeEditor({ control, name, label, defaultValue = "" }) {
  const id = name; // Use the name prop as the id for label association

  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey='klznlrmqwhi2s6n9foggfvpn2yljy5ndjobt3x90vgwyv6wn'
            id={id}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor",
                "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media",
                "table", "code", "help", "wordcount"
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RealTimeEditor;
