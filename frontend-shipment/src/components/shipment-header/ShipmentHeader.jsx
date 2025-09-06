import { Card, CardContent, CardHeader } from "semantic-ui-react";
const ShipmentHeader = ({
  headerIcon,
  headerStyle,
  headerTitle,
  children,
  headerDesc,
}) => {
  return (
    <>
      <Card style={headerStyle}>
        <CardHeader className="card_header">
          <div className="header_file_icon">{headerIcon}</div>
          <div className="header_and_desc">
            <h3>{headerTitle}</h3>
            {headerDesc && <span className="header_desc">{headerDesc}</span>}
          </div>
        </CardHeader>
        {children ? <CardContent>{children}</CardContent> : null}
      </Card>
    </>
  );
};

export default ShipmentHeader;
