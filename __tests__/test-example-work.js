import React from "react";
import { shallow } from "enzyme";
import ExampleWork, { ExampleWorkBubbles } from "../js/example-work";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const myWork = [
  {
    title: "All You Need",
    image: {
      desc: "example image of a cat.",
      source: "images/example3.png",
      comment: `“Bengal cat” by roberto shabs is licensed under CC BY 2.0
           https://www.flickr.com/photos/37287295@N00/2540855181`
    }
  },
  {
    title: "AWS Lambda Snapshot Backup & Prune",
    image: {
      desc: "example screenshot of a project involving code",
      source: "images/example1.png",
      comment: "probably doesn't even compile"
    }
  }
];

describe("ExampleWork component", () => {
  let component = shallow(<ExampleWork work={myWork} />);

  it("Should be a section element", () => {
    expect(component.type()).toEqual('section');
  });

  it("Should have the same number of children as there are examples", () => {
    expect(component.find("ExampleWorkBubbles").length).toEqual(myWork.length);
  });
});

describe("ExampleWorkBubbles component", () => {
  let component = shallow(<ExampleWorkBubbles example={myWork[1]} />);
  let images = component.find("img");

  it("Should contain a single img element", () => {
    expect(images.length).toEqual(1);
  });

  it("Should contain the correct img src", () => {
    //expect(images.node.props.src).toEqual(myWork[1].image.src);
  });
});
