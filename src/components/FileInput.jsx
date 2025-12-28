import React from "react";

const FileInput = ({}) => {
  return (
    <React.Fragment>
      <div className="flex items-center gap-4">
        <div className="relative group w-14 h-14 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaImage className="text-gray-400" />
          )}
        </div>
        <input
          type="file"
          id="profilePic"
          className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
          accept="image/*"
          {...register("profilePic")}
        />
      </div>
    </React.Fragment>
  );
};

export default FileInput;
