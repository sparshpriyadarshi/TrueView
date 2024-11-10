// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//const GOOGLE_ORIGIN = 'https://www.google.com';
const YT_ORIGIN = 'https://www.youtube.com';

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  // Enables the side panel on youtube.com/watch pages
  //if (url.origin === YT_ORIGIN && url.pathname.startsWith('/watch')) {
  if (url.origin === YT_ORIGIN) {
    //console.log("url path is ", url.pathname);
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
    //TODO fix me, this is only supposed to be called in response to a user gesture ?
    await chrome.sidePanel.open({ tabId: tabId}); 


  } else {
    // Disables the side panel on all other sites
    //await chrome.sidePanel.setOptions({
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});
