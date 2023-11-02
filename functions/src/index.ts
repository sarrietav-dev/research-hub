/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onObjectFinalized } from "firebase-functions/v2/storage";
import { setGlobalOptions } from "firebase-functions/v2/options";
import { getFirestore } from "firebase-admin/firestore";
import { Storage } from "@google-cloud/storage";
import { read } from "xlsx";
import * as ExcelTools from "./excel-tools";
import { initializeApp } from "firebase-admin/app";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

setGlobalOptions({ maxInstances: 10 });

export const onFileUpload = onObjectFinalized(
  "research-hub-8afa2",
  async (event) => {
    initializeApp();
    const fileBucket = event.bucket;
    const filePath = event.data.name;
    const contentType = event.data.contentType;

    const storage = new Storage();
    const db = getFirestore();

    if (!contentType?.includes("sheet")) {
      return;
    }

    const bucket = storage.bucket(fileBucket);
    const file = await bucket.file(filePath).download();
    const excelFile = file[0];

    const workbook = read(excelFile, { type: "buffer" });
    const ws = workbook.Sheets[workbook.SheetNames[0]];

    const excelData = {
      seedGroupName: ExcelTools.getSeedGroupName(ws),
      creationDate: ExcelTools.getCreationDate(ws),
      leaderInfo: ExcelTools.getLeaderInfo(ws),
      researchers: ExcelTools.getResearchers(ws),
      members: ExcelTools.getMembers(ws),
      parentGroup: ExcelTools.getParentGroup(ws),
      groupProgram: ExcelTools.getGroupProgram(ws),
      reaserchTracks: ExcelTools.getReaserchTracks(ws),
      groupDescription: ExcelTools.getGroupDescription(ws),
      localEvents: ExcelTools.getLocalEvents(ws),
      internationalEvents: ExcelTools.getInternationalEvents(ws),
      finishedWorks: ExcelTools.getFinishedWorks(ws),
      currentWorks: ExcelTools.getCurrentWorks(ws),
    };

    db.collection("seedGroups").add(excelData);
  }
);
