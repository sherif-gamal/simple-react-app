import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const ResourceCard = ({ resource }) => (
  <Card className="column twelve wide">
    <Image src={resource.thumbnailUrl} />
    <Card.Content>
      <Card.Header>{resource.title}</Card.Header>
      <Card.Meta>
        <span className="date">Lorem Ipsum</span>
      </Card.Meta>
      <Card.Description>
        {resource.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="like" />
        {resource.likes}
      </a>
    </Card.Content>
  </Card>
);

export default ResourceCard;
