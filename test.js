const data = {
    nodes: [
        { id: "Math 101" },
        { id: "CS 101" },
        { id: "CS 102" },
        { id: "CS 201" },
        { id: "CS 301" }
    ],
    links: [
        { source: "Math 101", target: "CS 101" },
        { source: "CS 101", target: "CS 102" },
        { source: "CS 101", target: "CS 201" },
        { source: "CS 102", target: "CS 301" },
        { source: "CS 201", target: "CS 301" }
    ]
};

const svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

const g = svg.append("g").attr("transform", "translate(50,50)");

const dag = d3.dagStratify()(data.links.map(d => ({ id: d.target, parentIds: [d.source] })));
const layout = d3.sugiyama().size([width - 100, height - 100]);
layout(dag);

const link = g.append("g")
    .selectAll("line")
    .data(dag.links())
    .enter().append("line")
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y)
    .attr("stroke", "#999")
    .attr("stroke-width", 2);

const node = g.append("g")
    .selectAll("circle")
    .data(dag.descendants())
    .enter().append("g")
    .attr("transform", d => `translate(${d.x},${d.y})`);

node.append("circle")
    .attr("r", 20)
    .attr("fill", "#69b3a2");

node.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", 5)
    .text(d => d.data.id);
