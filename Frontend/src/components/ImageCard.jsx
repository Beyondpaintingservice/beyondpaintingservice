/* eslint-disable react/prop-types */
import {
	DownloadOutlined,
	RotateLeftOutlined,
	RotateRightOutlined,
	SwapOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";

import "./imageCardCSS.css";

const ImageCard = ({
	img = "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
	className,
}) => {
	const onDownload = () => {
		fetch(img)
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(new Blob([blob]));
				const link = document.createElement("a");
				link.href = url;
				link.download = "image.png";
				document.body.appendChild(link);
				link.click();
				URL.revokeObjectURL(url);
				link.remove();
			});
	};
	return (
		<Image
			className={className + "hover:bg-transparent "}
			src={img}
			preview={{
				toolbarRender: (
					_,
					{
						transform: { scale },
						actions: {
							onFlipY,
							onFlipX,
							onRotateLeft,
							onRotateRight,
							onZoomOut,
							onZoomIn,
						},
					}
				) => (
					<Space size={12} className='toolbar-wrapper'>
						<DownloadOutlined onClick={onDownload} />
						<SwapOutlined rotate={90} onClick={onFlipY} />
						<SwapOutlined onClick={onFlipX} />
						<RotateLeftOutlined onClick={onRotateLeft} />
						<RotateRightOutlined onClick={onRotateRight} />
						<ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
						<ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
					</Space>
				),
			}}
		/>
	);
};
export default ImageCard;
