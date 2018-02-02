/******************************************************************************* 
 * Topic 5: Browswer Storage
 *   Local Storage
 *   Session Storage
 *   Cookies
 *   Storing and Retrieving Simple Data, Arrays, Associative Arrays, and Objects
*******************************************************************************/

var clickStart;

// initial set up of toDo list
var toDo;
if (localStorage.length === 0) {
    toDo = {
        lastID: 4,
        list: [
            {
                title: 'Reorder with arrow',
                completed: true,
                id: 3
            },
            {
                title: 'Click to complete',
                completed: false,
                id: 0
            },
            {
                title: 'Swipe right to delete',
                completed: true,
                id: 1
            }
        ]
    }
}
else {
    toDo = localStorage.getItem('toDo');
    toDo = JSON.parse(toDo);
}
drawList(toDo.list);

var item = function(title, id) {
    return (
        {
            title: title,
            completed: false,
            id: id
        }
    );
};

/***************************************************
 * Event Listeners
 **************************************************/
// add list item button
document.querySelector("#add-item")
    .addEventListener("click", function(){
        var input = document.getElementById('item-input').value;
        if (!input.replace(/\s/g, '').length) {
            console.log('too much space');
            document.getElementById('item-input').value = '';
            return;
        }
        var newItemObject = item(input, ++toDo.lastID);
        toDo.list.push(newItemObject);
        drawList([newItemObject])

        document.getElementById('item-input').value = '';
        save(toDo);
    });

document.querySelector('#item-input')
    .addEventListener('keypress', function(e){
        if (e.charCode == 13) {
            document.querySelector("#add-item").click();
        }
    });

// the toDo list DOM Element
var list = document.querySelector(".to-do-list");

// click to complete item
list.addEventListener("click", function(e) {
    var item = e.target.parentNode;
    var id = item.id;
    var timeDif = e.timeStamp - clickStart.timeStamp;
    var mouseDif = e.clientX - clickStart.clientX;
    // No click if too much time ellapsed or movement 
    if (timeDif < 300 && mouseDif < 5) {
        if (item.classList.contains('to-do-item')) {
            for (let i=0; i<toDo.list.length; i++) {
                if (toDo.list[i].id == id) {
                    item.classList.toggle('completed');
                    toDo.list[i].completed = !toDo.list[i].completed;
                    i = toDo.list.length;
                }
            }
        }
    }
    save(toDo);
});

function swipeItem (e) {
    console.log('swiping item')
    // get initial state of list item
    clickStart = createStartClick(e);
    
    document.addEventListener('mousemove',swipe);
    
    document.addEventListener('mouseup',function mouseup(e){
        var distance = e.clientX - clickStart.clientX;
        var width = clickStart.item.getBoundingClientRect().width;
        var percent = distance/width

        var item = document.getElementById(`${clickStart.item.parentNode.id}`);
        // has item moved far enough to the right?
        if (percent > .2) {
            item.parentNode.removeChild(item)
            console.log(item)
            removeItem(item.id);
        }
       //NO? Put it back to normal
        item.querySelector('span').style.transform = `translateX(0px)`;
        document.removeEventListener('mousemove',swipe);
        document.removeEventListener('mouseup',mouseup);
    });
};

function swipe(e) {
    var thing = document.getElementById(`${clickStart.item.parentNode.id}`).querySelector('span')
    var edgeDif = thing.getBoundingClientRect().left - clickStart.left;
    var mouseDif = e.clientX - clickStart.clientX;
    // is item left edge left of the starting left egde?
    if (mouseDif < 0) {
        // yes: reassign clickStart
        if (clickStart.clientX > clickStart.left+20) {
            clickStart.clientX = e.clientX;
        }
    }
    else {
        // no: move item with mouse
        thing.style.transform = `translateX(${mouseDif}px)`;
    }
}

function dragItem (e) {
    clickStart = createStartClick(e);
    var duplicate = e.target.parentNode.cloneNode(true);
    duplicate.id = duplicate.id+'d';
    duplicate.classList.add('duplicate');
    console.log(e)
    duplicate.style.top = `${e.clientY + clickStart.top - clickStart.clientY}px`;
    duplicate.style.left = `${20}px`;
    clickStart.item.parentNode.classList.toggle('hidden')
    
    document.querySelector('body').appendChild(duplicate)
    document.addEventListener('mousemove',drag);

    document.addEventListener('mouseup',function mouseup(e){
        clickStart.item.parentNode.classList.toggle('hidden');
        var item = document.getElementById(`${clickStart.item.parentNode.id}d`);
        console.log(item)
        item.parentNode.removeChild(item)
        document.removeEventListener('mousemove',drag);
        document.removeEventListener('mouseup',mouseup);
    })
    
    //moveItem(draggedItem.item.id, position-1);
    //list.insertBefore(draggedItem.item, list.childNodes[position])
      
    //draggedItem.item.setAttribute('style', '');
    };

function drag(e) {
    var thing = document.getElementById(`${clickStart.item.parentNode.id}d`);
    var listTop = document.querySelector('.to-do-list').offsetTop;
    var height = thing.offsetHeight;
    var numItems = document.querySelector('.to-do-list').offsetHeight/height;
    var offset = clickStart.clientY - clickStart.top;
    var position = Math.round((e.clientY - listTop - offset + height/2)/height);
    putInPosition(position);
    moveItem(clickStart.item.id, position);
    thing.style.top = `${e.clientY + clickStart.top - clickStart.clientY}px`;
    
}
function putInPosition(pos) {
    var container = document.querySelector('.to-do-list');
    container.insertBefore(clickStart.item.parentNode, container.children[pos]);
}


/***************************************************
 * DOM
 **************************************************/

function buildItem(item) {
    var li = document.createElement('div');
    var title = document.createTextNode(item.title);
    var handle = document.createElement('div');
    var span = document.createElement('span');
    
    span.appendChild(title);
    span.classList.add('item-child');
    span.addEventListener( 'mousedown', swipeItem);
    //span.addEventListener( 'touchstart', swipeItemT);
    
    handle.appendChild(document.createTextNode('↕'));
    handle.classList.add('handle');
    handle.addEventListener( 'mousedown', dragItem )
    //handle.addEventListener( 'touchstart', dragItemT )

    li.id = item.id;
    li.classList.add('to-do-item');
    li.appendChild(handle);
    li.appendChild(span);
    if (item.completed === true) {
        li.classList.add('completed')
    }

    return li;
}

// add single list item to DOM
function addItemToDOM(li) {
    var div = document.querySelector('div.to-do-list');
    div.appendChild(li);
}

// build out entire list in the DOM
function drawList(list) {
    list.forEach( item => {
        var listItem = buildItem(item);
        addItemToDOM(listItem);
    });
};

// remove item from toDo list object
function removeItem(id) {
    for (let i=0; i<toDo.list.length; i++) {
        if (toDo.list[i].id == id) {
            toDo.list.splice(i, 1);
        }
    }
    save(toDo);
}

// move toDo list item[id] to position
function moveItem(id, position) {
    for (let i=0; i<toDo.list.length; i++) {
        if (toDo.list[i].id == id) {
            let item = toDo.list[i];
            toDo.list.splice(i, 1);
            toDo.list.splice(position < i ? position : position+1, 0, item);
        }
    }
    save(toDo);
}

// save toDo object to local storage
function save(toDo) {
    localStorage.setItem('toDo', JSON.stringify(toDo));
}

// create startClick object
function createStartClick(e) {
    return {
        top: e.target.getBoundingClientRect().top,
        left: e.target.getBoundingClientRect().left,
        item: e.target,
        clientX: e.clientX,
        clientY: e.clientY,
        timeStamp: e.timeStamp
    };
}