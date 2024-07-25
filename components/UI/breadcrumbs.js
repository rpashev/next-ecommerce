import Link from "next/link";

const Breadcrumbs = (props) => {
  return (
    <nav aria-label="breadcrumb" className="mx-3">
      <ol className="breadcrumb">
        {props.links.map((link) => {
          const href = link === "Home" ? "/" : `/${link.toLowerCase()}`;
          return (
            <li key={link} className="breadcrumb-item">
              <Link href={href}>{link}</Link>
            </li>
          );
        })}
        <li className="breadcrumb-item active" aria-current="page">
          {props.current}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
