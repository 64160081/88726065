document.addEventListener("DOMContentLoaded", function () { //กำหนดตัวแปร document ขึ้นมาที่มีชื่อ addEventListener จกานั้นทำการสร้างฟังก์ชั่นขึ้นมา
    const todoList = document.getElementById("todo-list");  //กำหนดตัวแปร todolist ขึ้นมาที่มี ID "todo-list" บนหน้า HTML.
                                                            //มักใช้ในการดึงหรือแก้ไขข้อมูลในรายการทำ (To-Do List) ที่แสดงบนหน้าเว็บ.
    const todoInput = document.getElementById("todo-input");//กำหนดตัวแปรที่อ้างถึง Element ที่มี ID "todo-input" บนหน้า HTML.
                                                            //ส่วนมากใช้เพื่อดึงข้อมูลจาก input field ที่ผู้ใช้กรอกเพื่อใช้ในการเพิ่มรายการทำใน To-Do List.
    const addButton = document.getElementById("add-button");//เป็นตัวแปรที่อ้างถึง Element ที่มี ID "add-button" บนหน้า HTML.
                                                            //ใช้เพื่อระบุปุ่มที่เมื่อคลิก, จะเกิดเหตุการณ์ที่ทำให้เกิดการเพิ่มรายการทำลงใน To-Do List จากข้อมูลที่ผู้ใช้กรอกใน input field.
    // อาร์เรย์สำหรับเก็บรายการ Todo
    let todos = []; //ประกาศตัวแปร Todos มาและให้ค่าของมันเป็นค่า Array ที่มีค่าว่าง
    // เพิ่มรายการ Todo
    function addTodo() { //ประกาศฟังก์ชั่น addTodo
        const todoText = todoInput.value.trim(); //ทำหน้าที่ดึงข้อมูลที่ผู้ใช้กรอกใน input field (ที่มี id เป็น "todo-input") และเก็บไว้ในตัวแปร todoText. 
        if (todoText !== "") { //ถ้าตัวแปร todoText มีค่า ไม่เท่ากับค่าว่าง
            const todoItem = { //ให้ตัวแปร todoItem นั้นจะมีค่า เป็น

                text: todoText, //text: เก็บข้อความของรายการทำที่ผู้ใช้ป้อนใน input field และถูกเก็บไว้ในตัวแปร todoText.
                completed: false,// แสดงถึงรายการทำนี้ยังไม่ได้เสร็จสิ้น.
            };
            todos.push(todoItem);//เพิ่ม Object todoItem ที่สร้างไว้ลงใน Array todos ที่ถูกประกาศไว้ก่อนหน้านี้.
            renderTodoList();//เรียกใช้ฟังก์ชัน renderTodoList() ซึ่งมีหน้าที่แสดงผล To-Do List ใหม่ทั้งหมด. 
            todoInput.value = "";//ล้างค่าใน input field (ที่มี id เป็น "todo-input") ซึ่งหมายความว่าหลังจากที่ผู้ใช้ได้เพิ่มรายการทำแล้ว, input field จะกลับเป็นค่าว่างเพื่อให้ผู้ใช้สามารถป้อนรายการทำต่อไปได้สะดวก
        }
    }
    // ลบรายการ Todo
    function deleteTodo(index) { //ในบรรทัดนี้, splice ถูกใช้เพื่อลบรายการทำ (To-Do Item) ที่อยู่ในตำแหน่ง index ของ Array todos. 
        todos.splice(index, 1);//กำหนดให้ 1 คือจำนวนของรายการทำที่ต้องการลบ.
        renderTodoList();//เมื่อมีการลบรายการทำแล้ว, ฟังก์ชัน renderTodoList() ถูกเรียกเพื่อแสดงผล To-Do List ใหม่ทั้งหมด. 
        }
    // ตรวจสอบ/ยกเลิกการเสร็จสิ้นรายการ Todo
    function toggleComplete(index) {//เมื่อสถานะ "completed" ของรายการทำถูกกด (To-Do Item) ที่อยู่ในตำแหน่ง index ของ Array 
        todos[index].completed = !todos[index].completed; // ทำให้ค่า completed กลับด้วยค่าทางLogicของมัน (ถ้าเป็น true ก็จะกลับเป็น false) 
        renderTodoList();//เมื่อสถานะ "completed" ของรายการทำถูกสลับ, ฟังก์ชัน renderTodoList() ถูกเรียกเพื่อแสดงผล To-Do List ใหม่ทั้งหมด. ฟังก์ชันนี้ทำหน้าที่รวบรวมข้อมูลจาก Array todos และแสดงผลทั้ง To-Do List ในหน้าเว็บ.
        }

    // แสดงรายการ Todo บนหน้าเว็บ
    function renderTodoList() {
        console.log(todos);//แสดงข้อมูลของ Array todos ใน Console. นี้ช่วยในการตรวจสอบว่าข้อมูลใน Array todos ถูกเปลี่ยนแปลงตามที่คาดหวังหรือไม่.
        todoList.innerHTML = "";//ล้างความเข้าใจของ Element ที่มี id เป็น "todo-list" บนหน้า HTML ทั้งหมด. นั่นคือ, จะลบทุก HTML ที่อยู่ในนั้นให้เป็นค่าว่าง
        for (let i = 0; i < todos.length; i++) {
            const todoItem = todos[i];//ทุกครั้งที่ลูปทำงานในรอบใหม่, todoItem จะถูกกำหนดค่าเป็น Object รายการทำที่ตำแหน่ง i ใน Array 
            const listItem = document.createElement("li");//สร้าง Element li ใหม่โดยใช้ document.createElement("li")
            listItem.textContent = todoItem.text;//และกำหนดข้อความของ Element นั้นเป็นข้อความของรายการทำ (todoItem.text).   Element li นี้จะถูกใช้ในการแสดงผลทั้งในหน้าเว็บ.
            if (todoItem.completed) { //ถ้า todoItem.completed เป็น true, คำสั่ง listItem.classList.add("completed") 
                listItem.classList.add("completed");//จะถูกใช้เพื่อเพิ่มคลาส "completed" ให้กับ Element li. นี่มักใช้ในการปรับสีหรือสไตล์ของรายการทำที่เสร็จสิ้นใน To-Do List.
            }
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "ลบ"; //สร้าง Element button และกำหนดข้อความให้กับปุ่มนี้ว่า "ลบ".
            deleteButton.addEventListener("click", () => deleteTodo(i));//เพิ่ม Event Listener ที่รอฟังเหตุการณ์ "click" บนปุ่มลบ และเรียกใช้ฟังก์ชัน deleteTodo(i) เมื่อปุ่มถูกคลิก. การใช้ () => deleteTodo(i) เป็นรูปแบบของ Arrow Function ที่ถูกใช้เพื่อให้สามารถส่งอาร์กิวเมนต์ไปยังฟังก์ชัน deleteTodo ได้.
            const completeButton = document.createElement("button");//สร้าง Element button 
            completeButton.textContent = todoItem.completed ? "ยกเลิก" : "เสร็จ";//และกำหนดข้อความให้กับปุ่มนี้ว่า "เสร็จ" หรือ "ยกเลิก" ขึ้นอยู่กับสถานะ todoItem.completed ของรายการทำ.
            completeButton.addEventListener("click", () => toggleComplete(i));//พิ่ม Event Listener ที่รอฟังเหตุการณ์ "click" บนปุ่มเปลี่ยนสถานะ และเรียกใช้ฟังก์ชัน toggleComplete(i) เมื่อปุ่มถูกคลิก. การใช้ () => toggleComplete(i) ในรูปแบบของ Arrow Function ทำให้สามารถส่งอาร์กิวเมนต์ไปยังฟังก์ชัน toggleComplete ได้.
            listItem.appendChild(completeButton);//ทั้งสองปุ่มถูกเพิ่มลงใน Element li ที่ถูกสร้างขึ้นสำหรับแต่ละรายการทำ.
            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);//Element li ทั้งหมด (พร้อมกับปุ่มลบและปุ่มเปลี่ยนสถานะ) ถูกเพิ่มลงใน Element ul ที่มี id เป็น "todo-list" บนหน้า HTML.
        }
    }
    // การกดปุ่ม "เพิ่ม"
    addButton.addEventListener("click", addTodo);
    // การกด Enter ใน input
    todoInput.addEventListener("keypress", function (event) {//เมื่อผู้ใช้กดปุ่มพิมพ์บน input field
        if (event.key === "Enter") {//ถ้าปุ่มที่ถูกกดคือ "Enter"
            addTodo();//เรียกใช้ฟังก์ชัน addTodo() เพื่อเพิ่มรายการทำใน To-Do List.
        }
    });

    // แสดงรายการ Todo คร้ังแรก
    renderTodoList();
});