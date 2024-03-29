// function animateCircle() {
//   const circle = document.getElementById('circle');
//   const length = circle.getTotalLength();

//   circle.style.transition = circle.style.WebkitTransition = 'none';
//   circle.style.strokeDasharray = length + ' ' + length;
//   circle.style.strokeDashoffset = length;

//   circle.getBoundingClientRect();

//   circle.style.transition = circle.style.WebkitTransition = 'stroke-dashoffset 3s ease-in-out';
//   circle.style.strokeDashoffset = '0';

//   setTimeout(() => {
//     circle.style.display = 'none';
//     showNavAndMindMap();
//   }, 3000); // Adjust this time based on how long you want the filled circle to be displayed
// }
// function showNavAndMindMap() {
//   const nav = document.getElementById('navigation');
//   // const mindmap = document.getElementById('mindmap');

//   // 원이 사라진 후 네비게이션 바와 마인드맵을 보여줌
//   nav.style.display = 'block';
//   // mindmap.style.display = 'block';
// }

// // animateCircle 함수 호출
// animateCircle();

// // animateCircle();

// function showMindmapAfterDelay() {
//   setTimeout(() => {
//     const mindmapContainer = document.getElementById('mindmap-container');
    
//     mindmapContainer.style.display = 'block'; // 마인드맵을 보여줍니다.
//   }, 5000); // 5000 밀리초(5초) 후에 마인드맵을 보여줍니다. 이 부분은 필요에 따라 조절할 수 있습니다.
// }

// // 원을 보여주는 함수 호출
// showMindmapAfterDelay();



// JavaScript
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const menuContainer = document.getElementById('menuContainer');

  const menuWindow = document.createElement('div');
  menuWindow.classList.add('menu-window');
  menuWindow.innerHTML = 'Your menu content here'; // Replace this with your menu content

  hamburger.addEventListener('click', () => {
    // Toggle the menu window
    if (!menuWindow.classList.contains('active')) {
      menuContainer.appendChild(menuWindow);
      menuWindow.classList.add('active');
    } else {
      menuWindow.classList.remove('active');
      menuWindow.addEventListener('transitionend', () => {
        menuWindow.remove();
      }, { once: true });
    }
  });
});


// function showMindMap() {
  document.getElementById("closeModal").addEventListener("click", hideModal);
  
  const distance = 270;
  
  const imageScene = new THREE.Scene();
  
  const nodeImages = {
    1: "image/logo.svg",
    2: {
      Platform: "image/Platform.svg",
      Awards: "image/수상.svg",
      SNS: "image/SNS.svg",
      SI: "image/SI.svg",
    },
    3: {
      Failertalk: "image/페일러톡.svg",
      Ttagttaguli: "image/딱따구리.svg",
      naafaa: "image/NAAFAA.svg",
      moonjapay: "image/문자페이.svg",
      놀가: "image/놀가.svg",
      팀WORK: "image/팀WORK.svg",
      "server solution": "image/Server.svg",
      // "보안 솔루션": "Security.svg",
      "network solutions": "image/Network.svg",
      "Computer HW": "image/Hardware.svg",
      "Voice Infrastructure": "image/Voice infra.svg",
      // "Computer SW": "Software.svg",
      Instagram: "image/Instagram.svg",
      Homepage: "image/Homepage.svg",
      "Naver Blog": "image/Blog.svg",
      Kakaotalk: "image/Kakaotalk.svg",
      "MSS Ministry's Business Innovation Award": "image/수상.svg",
      "Korea Engineer Award": "image/수상.svg",
      "Top 100 Korean Brand Award [IT Platform]": "image/수상.svg",
    },
  };
  
  const Graph = ForceGraph3D()(document.getElementById("3d-graph"))
    .jsonUrl("../datasets/miserables.json")
    .nodeLabel("id")
    .nodeAutoColorBy("group")
  
    .enableNavigationControls(false)
    .enableNodeDrag(false)
    .onNodeClick((node) => {
      const nodeId = node.id;
      if (nodeImages[node.group]) {
        const imageSrc = nodeImages[node.group];
        if (typeof imageSrc === "object" && imageSrc[nodeId]) {
          console.log(`Node "${nodeId}" clicked!`);
        }
      }
    })
  
    .linkThreeObject((link) => {
      const whiteColor = new THREE.Color("white");
      // const lineWidth = 555;
  
      const material = new THREE.LineBasicMaterial({
        color: whiteColor,
        transparent: true,
      });
      return new THREE.Line(link.geometry, material);
    })
  
    .nodeThreeObject((node) => {
      const groupId = node.group;
      const nodeId = node.id;
  
      if (nodeImages[groupId]) {
        let imageSrc = nodeImages[groupId];
  
        if (typeof imageSrc === "object" && imageSrc[nodeId]) {
          imageSrc = imageSrc[nodeId];
        }
  
        const textureLoader = new THREE.TextureLoader();
        backgroundTexture.encoding = THREE.sRGBEncoding;
  
        const svgTexture = textureLoader.load(imageSrc);
        svgTexture.encoding = THREE.sRGBEncoding;
        const svgMaterial = new THREE.MeshBasicMaterial({
          map: svgTexture,
          depthTest: false,
          transparent: true,
          side: THREE.DoubleSide,
        });
  
        const svgMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(15, 15),
          svgMaterial
        ); // 노드 크기를 조절
  
        const logoTexture = textureLoader.load(imageSrc);
        logoTexture.encoding = THREE.sRGBEncoding;
  
        logoTexture.wrapS = THREE.ClampToEdgeWrapping;
        logoTexture.wrapT = THREE.ClampToEdgeWrapping;
  
        const logoMaterial = new THREE.MeshBasicMaterial({
          map: logoTexture,
          depthTest: false,
          transparent: true,
          side: THREE.DoubleSide,
        });
  
        const logo = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), logoMaterial);
  
        const imageMaterial = new THREE.MeshBasicMaterial({
          map: logoTexture,
          depthTest: false,
          transparent: true,
          opacity: 1,
          side: THREE.DoubleSide,
          renderOrder: -1,
        });
  
        const image = new THREE.Mesh(
          new THREE.PlaneGeometry(17, 17),
          imageMaterial
        );
  
        image.position.z = -0.1;
        image.renderOrder = 50;
  
        image.onBeforeRender = function (
          renderer,
          scene,
          camera,
          geometry,
          material,
          group
        ) {
          const euler = new THREE.Euler();
          euler.copy(camera.rotation);
          image.rotation.set(euler.x, euler.y, euler.z);
        };
  
        const group = new THREE.Group();
        group.add(image);
        imageScene.add(group);
  
        return group;
      }
    })
  
    .onEngineTick(() => {
      Graph.graphData().nodes.forEach((n) => {
        if (n.id === "Robot N Com") {
          n.__threeObj.scale.set(4, 4, 4);
          n.__threeObj.position.x = 22;
        } else if (["Platform", "SI", "Awards", "SNS"].includes(n.id)) {
          n.__threeObj.scale.set(2, 2, 2);
        }
      });
    });
  
  window.addEventListener("resize", () => {
    const graphContainer = document.getElementById("3d-graph");
    Graph.width(graphContainer.offsetWidth).height(graphContainer.offsetHeight);
  });
  
  function zoomInToNode(node) {
    const distance = 20;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
  
    Graph.cameraPosition(
      {
        x: node.x * distRatio,
        y: node.y * distRatio,
        z: node.z * distRatio,
      },
      node,
      3000
    );
  }
  
  Graph.onNodeClick((node) => {
    const nodeId = node.id;
  
    if (
      nodeId === "naafaa" ||
      [
        "페일러톡",
        "딱따구리",
        "나아파",
        "문자페이",
        "놀가",
        "서버 솔루션",
        "보안 솔루션",
        "Computer HW",
        "보이스인프라",
        "네트워크 솔루션",
        "Computer SW",
        "중소벤처기업부 경영혁신 부문 장관상",
        "대한민국 엔지니어상",
        "한국 대표 브랜드 TOP 100 [IT 플랫폼] 부문 수상",
      ].includes(nodeId)
    ) {
      showNaafaModal();
    } else if (node.id === "Instagram") {
      window.open("https://www.instagram.com/robot_n_com/", "_blank");
    } else if (node.id === "Homepage") {
      window.open("https://www.robotncom.com/", "_blank");
    } else if (node.id === "Naver Blog") {
      window.open("https://blog.naver.com/robotncom", "_blank");
    } else if (node.id === "Kakaotalk") {
      window.open("http://pf.kakao.com/_VMxcds", "_blank");
    }
  });
  
  let angle = 182;
  setInterval(() => {
    Graph.cameraPosition({
      x: distance * Math.sin(angle),
      z: distance * Math.cos(angle),
    });
    angle += Math.PI / 6000;
  }, 10);
  
  let prevX = 0,
    prevY = 0;
  const $target = document.querySelector("#direction");
  
  let mouseDownTimeout;
  let mouseDown = false;
  
  window.addEventListener("mousedown", (e) => {
    if (e.button === 0 || e.button === 2) {
      // 왼쪽 또는 오른쪽 마우스 버튼이 눌렸을 때
      mouseDown = true;
  
      // 1000 밀리초(1초) 후에 함수 실행을 위한 타임아웃 설정
      mouseDownTimeout = setTimeout(() => {
        // 1초 후에 실행할 코드
        console.log(
          `${e.button === 0 ? "왼쪽" : "오른쪽"} 마우스 버튼이 눌렸습니다.`
        );
        // 여기서 함수를 호출하거나 다른 작업을 수행할 수 있습니다.
        // 예를 들어, getMouseDirection(e)와 같은 함수를 호출할 수 있습니다.
        getMouseDirection(e);
      }, 1000);
    }
  });
  
  window.addEventListener("mouseup", () => {
    // 마우스 버튼이 떼어지면 타임아웃을 지웁니다.
    clearTimeout(mouseDownTimeout);
    mouseDown = false;
  });
  
  window.addEventListener("mousemove", (e) => {
    // 왼쪽 또는 오른쪽 마우스 버튼이 눌린 상태인지 확인합니다.
    if (mouseDown) {
      getMouseDirection(e);
    }
  });
  
  function getMouseDirection(e) {
    const xDir = prevX <= e.pageX ? "right" : "left";
    prevX = e.pageX;
    console.log(`${xDir} 마우스 방향`);
    if (xDir === "left") {
      Graph.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle),
      });
      angle += Math.PI / 100;
    } else if (xDir === "right") {
      Graph.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle),
      });
      angle -= Math.PI / 100;
    }
  }
  
  window.addEventListener("mouseup", getMouseDirection);
  
  const textureLoader = new THREE.TextureLoader();
  
  const backgroundTexture = textureLoader.load("image/back2.jpg");
  backgroundTexture.encoding = THREE.sRGBEncoding;
  Graph.renderer().setClearColor(new THREE.Color("black"));
  backgroundTexture.minFilter = THREE.NearestFilter;
  Graph.scene().background = backgroundTexture;
  
  function showNaafaModal() {
    console.log("showNaafaModal called");
    const modal = document.getElementById("Modalbackground");
    modal.style.display = "flex";
  
    modal.addEventListener("click", hideModal);
  }
  
  function hideModal() {
    event.stopPropagation();
    const modal = document.getElementById("Modalbackground");
    modal.style.display = "none";
  }

// }
// animateCircle();
// setTimeout(showMindMap, 3000);
  


  // section
  // document.addEventListener("DOMContentLoaded", function () {
  //   const introSection = document.getElementById("intro-section");
  //   let startTime;
  
  //   function animate(time) {
  //     if (!startTime) {
  //       startTime = time;
  //     }
  
  //     const elapsed = time - startTime;
  
  //     introSection.style.opacity = 1;
  
  //     if (elapsed < 9000) {
  //       introSection.style.opacity = 1 - elapsed / 8000;
  //       requestAnimationFrame(animate);
  //     } else {
  //       introSection.style.display = "none";
  //     }
  //   }
  
  //   requestAnimationFrame(animate);
  // });