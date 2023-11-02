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
import { Storage } from "@google-cloud/storage";
import { read } from "xlsx";
import * as ExcelTools from "./excel-tools";
import { initializeApp } from "firebase-admin/app";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types";

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
    const client = createClient<Database>(
      "https://sgojwoguzfgendyttegn.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnb2p3b2d1emZnZW5keXR0ZWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyMDc0MzEsImV4cCI6MjAxMzc4MzQzMX0.ZCfui1YBGK4bQuZNJ-sALvGCOOUNP6gkQwU0q_L-pAU"
    );

    const storage = new Storage();

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

    console.log("Inserting data into database");

    const { data, error } = await client
      .from("seed_groups")
      .insert({
        name: excelData.seedGroupName,
        description: excelData.groupDescription,
        program: excelData.groupProgram,
        parent_group: excelData.parentGroup,
        creation_date: excelData.creationDate,
        research_tracks: excelData.reaserchTracks,
        local_events: excelData.localEvents,
        international_events: excelData.internationalEvents,
      })
      .select();

    if (error) {
      return console.log(error);
    }

    const seedGroupId = data[0].id;

    console.log("Inserted seed group with id: ", seedGroupId);

    const researcherPromise = client
      .from("researchers")
      .insert(
        excelData.researchers.map((researcher) => ({
          full_name: researcher.fullName,
          seed_group_fk: seedGroupId,
          email: researcher.email,
          phone_number: researcher.phoneNumber,
          program: researcher.program,
        }))
      )
      .select();

    const groupPromise = client.from("group_members").insert(
      excelData.members.map((member) => ({
        full_name: member.fullName,
        seed_group_fk: seedGroupId,
        email: member.email,
        program: member.program,
        year_of_entry: member.yearOfEntry,
        id_card: member.id,
        student_code: member.studentCode,
        is_active: member.isActive,
        functions: member.functions,
        body: member.body,
      }))
    );

    const leadersPromise = client.from("leaders").insert({
      name: excelData.leaderInfo.name,
      seed_group_fk: seedGroupId,
      email: excelData.leaderInfo.email,
      phone: excelData.leaderInfo.phone,
    });

    const finishedWorksPromise = client.from("finished_works").insert(
      excelData.finishedWorks.map((work) => ({
        entity: work.entity,
        product: work.product,
        seed_groups_fk: seedGroupId,
        start_date: work.startDate,
        end_date: work.endDate,
        approved_amount: work.approvedAmount,
      }))
    );

    const currentWorksPromise = client.from("current_works").insert(
      excelData.currentWorks.map((work) => ({
        entity: work.entity,
        product: work.product,
        seed_groups_fk: seedGroupId,
        start_date: work.startDate,
        approved_amount: work.approvedAmount,
      }))
    );

    const results = await Promise.allSettled([
      researcherPromise,
      groupPromise,
      leadersPromise,
      finishedWorksPromise,
      currentWorksPromise,
    ]);

    for (const result of results) {
      if (result.status === "rejected") {
        console.log(result.reason);
      }
    }

    console.log("Finished inserting data into database");
  }
);
