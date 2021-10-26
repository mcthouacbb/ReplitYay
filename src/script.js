const canvas = document.getElementsByTagName("canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext("webgl2");

if (!gl) {
	console.log("No WebGL2 For You :(");
}

const vs = `#version 300 es

layout (location = 0) in vec3 a_Position;
layout (location = 1) in vec3 a_Color;

out vec3 v_Color;

void main() {
	gl_Position = vec4(a_Position, 1.0);
	v_Color = a_Color;
}
`;

const fs = `#version 300 es

precision highp float;

layout (location = 0) out vec4 fragColor;

in vec3 v_Color;

void main() {
	fragColor = vec4(v_Color, 1.0);
}
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vs);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fs);
gl.compileShader(fragmentShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const vertices = new Float32Array([
	 0.0,  0.5, 0.0, 1.0, 0.0, 0.0,
	-0.5, -0.5, 0.0, 0.0, 1.0, 0.0,
	 0.5, -0.5, 0.0, 0.0, 0.0, 1.0
]);

const indices = new Uint16Array([
	0, 1, 2	
]);

const vertexArray = gl.createVertexArray();
gl.bindVertexArray(vertexArray);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

gl.enableVertexAttibArray(0);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0);
gl.enableVertexAttribArray(1);
gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12);

gl.bindVertexArray(null);

let running = false;

function main() {
	gl.useProgram(program);
	gl.bindVertexArray(vertexArray);
	gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);z
	if (running)
		window.requestAnimationFrame(main);	
}
window.requestAnimationFrame(main);
