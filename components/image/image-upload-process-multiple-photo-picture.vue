<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            padding: 16px;
        }

        .upload-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .upload-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 20px;
        }

        .upload-button {
            padding: 16px;
            border: none;
            border-radius: 12px;
            background: #f8f9fa;
            color: #333;
            font-size: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .upload-button:hover {
            background: #e9ecef;
        }

        .button-icon {
            font-size: 24px;
            margin-bottom: 4px;
        }

        .upload-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .upload-item {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .item-preview {
            width: 48px;
            height: 48px;
            border-radius: 8px;
            overflow: hidden;
            background: #e9ecef;
        }

        .item-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .item-info {
            flex: 1;
        }

        .item-name {
            font-size: 14px;
            color: #333;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .progress-outer {
            height: 4px;
            background: #e9ecef;
            border-radius: 2px;
            overflow: hidden;
        }

        .progress-inner {
            height: 100%;
            background: #228be6;
            width: 0%;
            transition: width 0.3s ease;
        }

        .item-status {
            font-size: 12px;
            color: #868e96;
        }

        .remove-button {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: none;
            background: #ffe3e3;
            color: #e03131;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }

        .remove-button:hover {
            background: #ffc9c9;
        }

        input[type="file"] {
            display: none;
        }
    </style>
</head>
<body>
<div class="upload-container">
    <div class="upload-buttons">
        <button class="upload-button" onclick="document.getElementById('cameraInput').click()">
            <span class="button-icon">📸</span>
            拍照上传
        </button>
        <button class="upload-button" onclick="document.getElementById('galleryInput').click()">
            <span class="button-icon">🖼️</span>
            从相册选择
        </button>
    </div>

    <div class="upload-list" id="uploadList"></div>
</div>

<input type="file" id="cameraInput" accept="image/*" capture="camera">
<input type="file" id="galleryInput" accept="image/*" multiple>

<script>
    const uploadList = document.getElementById('uploadList');
    const cameraInput = document.getElementById('cameraInput');
    const galleryInput = document.getElementById('galleryInput');

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                addUploadItem(file);
            }
        });
    }

    cameraInput.addEventListener('change', (e) => handleFiles(e.target.files));
    galleryInput.addEventListener('change', (e) => handleFiles(e.target.files));

    function addUploadItem(file) {
        const item = document.createElement('div');
        item.className = 'upload-item';

        const preview = document.createElement('div');
        preview.className = 'item-preview';

        const info = document.createElement('div');
        info.className = 'item-info';

        const name = document.createElement('div');
        name.className = 'item-name';
        name.textContent = file.name;

        const progress = document.createElement('div');
        progress.className = 'progress-outer';
        progress.innerHTML = '<div class="progress-inner"></div>';

        const status = document.createElement('div');
        status.className = 'item-status';
        status.textContent = '准备上传...';

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-button';
        removeBtn.innerHTML = '×';
        removeBtn.onclick = () => item.remove();

        info.appendChild(name);
        info.appendChild(progress);
        info.appendChild(status);

        item.appendChild(preview);
        item.appendChild(info);
        item.appendChild(removeBtn);

        uploadList.appendChild(item);

        // 预览图片
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}">`;
        };
        reader.readAsDataURL(file);

        // 模拟上传进度
        simulateUpload(progress.querySelector('.progress-inner'), status);
    }

    function simulateUpload(progressBar, statusElement) {
        let progress = 0;
        statusElement.textContent = '上传中...';

        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                statusElement.textContent = '上传完成';
                statusElement.style.color = '#40c057';
            }
            progressBar.style.width = progress + '%';
        }, 200);
    }
</script>
</body>
</html>