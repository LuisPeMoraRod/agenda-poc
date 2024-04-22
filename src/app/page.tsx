"use client";
import {
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  EventSettingsModel,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { timelineResourceData } from "./datasource";
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";
import styles from "./page.module.css";

// Registering Syncfusion license key
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5XdEdjUHpZc3BQRmFU"
);

export default function Home(this: any) {
  const eventSettings = {
    dataSource: timelineResourceData,
  };
  const onPopupOpen = (args: {
    type: string;
    element: { querySelector: (arg0: string) => any };
  }) => {
    if (args.type === "Editor") {
      let statusElement = args.element.querySelector("#EventType");
      if (statusElement) {
        statusElement.setAttribute("name", "EventType");
      }
    }
  };
  const eventEditorStyle = { width: "100%", cellpadding: "5" };
  const inputStyle = { width: "100%" };
  const DescriptionStyle = {
    width: "100%",
    height: "60px !important",
    resize: "vertical",
  };
  const editorTemplate = (
    props:
      | {
          EventType: any;
          startTime: any;
          StartTime: any;
          endTime: any;
          EndTime: any;
        }
      | undefined
  ) => {
    return props !== undefined ? (
      <table className="custom-event-editor" style={eventEditorStyle}>
        <tbody>
          <tr>
            <td className="e-textlabel">Nombre</td>
            <td colSpan={4}>
              <input
                id="Summary"
                placeholder="Escribí el nombre..."
                className="e-field e-input"
                type="text"
                name="Subject"
                style={inputStyle}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Entrenador</td>
            <td colSpan={4}>
              <DropDownListComponent
                id="EventType"
                placeholder="Escogé un entrenador..."
                data-name="EventType"
                className="e-field"
                style={inputStyle}
                dataSource={["Andrea", "Juan", "Elena"]}
                value={props.EventType || null}
              ></DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Desde</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Hasta</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div></div>
    );
  };
  return (
    <div>
      <div>
        <h2>PoC - Schedule Component</h2>
        <ScheduleComponent
          width="100%"
          height="550px"
          currentView="Month"
          selectedDate={new Date()}
          eventSettings={eventSettings}
          editorTemplate={editorTemplate.bind(this)}
          showQuickInfo={false}
          popupOpen={onPopupOpen.bind(this)}
        >
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
          />
        </ScheduleComponent>
      </div>
    </div>
  );
}
