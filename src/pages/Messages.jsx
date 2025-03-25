// import React, { useState } from "react";
// import { useStateContext } from "../context/ContextProvider";
// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Inject,
//   Page,
//   Sort,
//   Filter,
//   Group,
//   Toolbar,
// } from "@syncfusion/ej2-react-grids";
// import {
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
//   Inject as ScheduleInject,
// } from "@syncfusion/ej2-react-schedule";
// import {
//   RichTextEditorComponent,
//   Toolbar as RteToolbar,
//   Link,
//   Image,
//   HtmlEditor,
//   Inject as RteInject,
// } from "@syncfusion/ej2-react-richtexteditor";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
// import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

// const Messages = () => {
//   const { userType } = useStateContext(); // userType expected as "student" or "company"

//   // Define separate message arrays for each user type.
//   const studentMessages = [
//     { id: 1, sender: "Company A", status: "Unread", content: "We are interested in your application.", date: "2023-10-01" },
//     { id: 2, sender: "Company B", status: "Replied", content: "Please schedule an interview.", date: "2023-10-05" },
//   ];
//   const companyMessages = [
//     { id: 3, sender: "Applicant X", status: "Unread", content: "I have applied for the position.", date: "2023-10-02" },
//     { id: 4, sender: "Applicant Y", status: "Replied", content: "Looking forward to hearing back.", date: "2023-10-06" },
//   ];

//   // Choose message data based on userType
//   const messagesData = userType === "student" ? studentMessages : companyMessages;

//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [newMessage, setNewMessage] = useState("");

//   const scheduleData = [
//     { Id: 1, Subject: "Interview with John Doe", StartTime: new Date(2023, 9, 15, 10, 0), EndTime: new Date(2023, 9, 15, 11, 0) },
//     { Id: 2, Subject: "Interview with Jane Smith", StartTime: new Date(2023, 9, 16, 14, 0), EndTime: new Date(2023, 9, 16, 15, 0) },
//   ];

//   const handleMessageSelect = (args) => {
//     setSelectedMessage(args.data);
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       alert(`Message sent: ${newMessage}`);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="m-10 bg-gray-100 main-bg dark:bg-main-dark-bg min-h-screen text-gray-800 dark:text-white">
//       <h1 className="text-3xl font-bold mb-6">
//         {userType === "student" ? "Messages from Companies" : "Messages from Applicants"}
//       </h1>

//       <div className="grid grid-cols-3 gap-8">
//         {/* Messages List */}
//         <div className="bg-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow-md">
//           <DropDownListComponent dataSource={["All", "Unread", "Replied", "Archived"]} placeholder="Filter by Status" className="mb-4 w-full" />
//           <GridComponent
//             dataSource={messagesData}
//             allowPaging={true}
//             allowSorting={true}
//             allowFiltering={true}
//             rowSelected={handleMessageSelect}
//             height="400px"
//           >
//             <ColumnsDirective>
//               <ColumnDirective field="sender" headerText="Sender" width="120" />
//               <ColumnDirective field="status" headerText="Status" width="100" />
//               <ColumnDirective field="content" headerText="Content" width="200" />
//               <ColumnDirective field="date" headerText="Date" width="120" format="yMd" />
//             </ColumnsDirective>
//             <Inject services={[Page, Sort, Filter, Group, Toolbar]} />
//           </GridComponent>
//         </div>

//         {/* Message Details */}
//         <div className="col-span-2 bg-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow-md">
//           {selectedMessage ? (
//             <>
//               <h2 className="text-xl font-semibold mb-4">Conversation with {selectedMessage.sender}</h2>
//               <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 border">{selectedMessage.content}</div>
//               <RichTextEditorComponent
//                 value={newMessage}
//                 change={(e) => setNewMessage(e.value)}
//                 placeholder="Compose your message..."
//               >
//                 <RteInject services={[RteToolbar, Link, Image, HtmlEditor]} />
//               </RichTextEditorComponent>
//               <ButtonComponent cssClass="e-primary mt-4" onClick={handleSendMessage}>
//                 Send Message
//               </ButtonComponent>
//             </>
//           ) : (
//             <p className="text-gray-500 text-center">Select a message to view details.</p>
//           )}
//         </div>
//       </div>

//       {/* Schedule Section */}
//       <div className="mt-8 bg-white dark:bg-secondary-dark-bg p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Schedule Interviews</h2>
//         <ScheduleComponent height="500px" selectedDate={new Date(2023, 9, 15)} eventSettings={{ dataSource: scheduleData }}>
//           <ScheduleInject services={[Day, Week, WorkWeek, Month, Agenda]} />
//         </ScheduleComponent>
//       </div>
//     </div>
//   );
// };

// export default Messages;
