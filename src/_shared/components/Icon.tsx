import React from "react";
import iconPaths from "./selection.json"; // the file exported from IcoMoon

interface Props {
  id: string;
  size?: number;
  style?: React.CSSProperties | undefined;
  onClick?: () => void;
  viewBox?: string;
  className?: string;
  name: string;
  color?: string;
}

export function getPath(iconName: string) {
  const Icon = iconPaths.icons.find(
    (icon: any) => icon.properties.name === iconName
  );

  if (Icon) {
    return Icon.icon.paths.join(" ");
  }
  return undefined;
  //   console.warn(`icon ${iconName} does not exist.`);
}

const Ikon: React.FC<Props> = (props) => (
  <svg
    className={props.className}
    id={props.id}
    width={`${props.size}rem`}
    height={`${props.size}rem`}
    style={props.style}
    viewBox={props.viewBox}
    onClick={props.onClick}
  >
    <path d={getPath(props.name)} fill={props.color} />
  </svg>
);

Ikon.defaultProps = {
  viewBox: "0 0 1024 1024",
  size: 1.375,
  color: "#000",
  style: {
    margin: 0,
    padding: 0,
  },
  className: "",
  id: "",
  onClick: () => {},
};

export default Ikon;
