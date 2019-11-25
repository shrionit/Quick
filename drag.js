function create(x, content){
    const frame = document.createElement('div');
    frame.id = x||'mydiv';
    frame.style.position = 'absolute';
    frame.style.width = 'auto';
    frame.style.background = 'transparent';
    frame.style.zIndex = '9';
    frame.style.textAlign = 'center';
    const head = document.createElement('div');
    head.id = x+'header';
    head.style.cursor = 'move';
    head.style.zIndex = '10';
    head.style.background = 'rgba(20, 20, 20, 0.36)';
    head.style.color = 'white';
    head.innerHTML = '<strong>'+x+'</strong>';
    frame.appendChild(head);
    content.style.display = 'flex';
    content.style.flexWrap = 'nowrap';
    head.appendChild(content);
    dragElement(frame);
    document.body.appendChild(frame);

    function dragElement(elmnt) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(
          elmnt.id + "header"
        ).onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
}