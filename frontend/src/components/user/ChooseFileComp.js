import React, { useState } from 'react';

const ChooseFileComp = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <div className="div-image-change">
            <input
                type="file"
                accept=".jpeg, .png"
                onChange={handleFileSelect}
                id="profile-image-input"
            />
            {selectedFile && <p className="selected-file-image">Odabrana slika: {selectedFile.name}</p>}
            <button className="change-profile-image" type="submit">Promijeni sliku profila</button>
        </div>
    );
};

export default ChooseFileComp;
