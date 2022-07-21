import classNames from "classnames";
import type { NextPage } from "next";
import { useState } from "react";

import RefreshButton from "../components/RefreshButton";
import SearchBar from "../components/Searchbar";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <aside className="page-sidebar settings-sidebar">
        <div className="sidebar-content">
          <div className="sidebar-title">Mail</div>
          <a href="/settings/mail" className="sidebar-list-item active">
            <i className="ri-send-plane-2-line" />
            <span className="txt">Mail settings</span>
          </a>
          <a href="/settings" className="sidebar-list-item">
            <i className="ri-image-2-line" />
            <span className="txt">Map Images</span>
          </a>
        </div>
      </aside>

      <main className="page-wrapper">
        <header className="page-header">
          <nav className="breadcrumbs">
            <div className="breadcrumb-item">Settings</div>
            <div className="breadcrumb-item">Mail settings</div>
          </nav>
        </header>

        <div className="max-w-7xl mx-auto">
          <form className="panel" autoComplete={"false"}>
            <div className="content txt-xl m-b-base">
              <p>Configure common settings for sending emails.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <div className="form-field required">
                  <label htmlFor="field_UeWCrTV">Sender name</label>
                  <input type="text" id="field_UeWCrTV" required={true} />
                </div>
              </div>

              <div className="col-span-1">
                <div className="form-field required">
                  <label htmlFor={"senderAddress"}>Sender address</label>
                  <input type="email" id={"senderAddress"} required />
                </div>
              </div>

              <div className="col-span-2 form-field required">
                <label htmlFor={"userPage"}>User verification page url</label>
                <input type="text" id={"userPage"} required />
                <div className="help-block">
                  Used in the user verification email. Available placeholder
                  parameters:
                  <code>%APP_URL%</code>, <code>%TOKEN%</code>.
                </div>
              </div>
            </div>

            <hr />

            <div className="content m-b-sm">
              <p>
                By default PocketBase uses the OS <code>sendmail</code> command
                for sending emails.
                <br />
                <strong className="txt-bold">
                  For better emails deliverability it is recommended to enable
                  the SMTP settings below.
                </strong>
              </p>
            </div>

            <div className="form-field form-div-toggle col-span-2">
              <input type="checkbox" id={"smtpEnbaled"} required />
              <label htmlFor={"smtpEnbaled"}>Use SMTP mail server</label>
            </div>

            <div className="grid">
              <div className="col-span-1">
                <div className="form-field required">
                  <label htmlFor={"smtpHost"}>SMTP server host</label>
                  <input type="text" id={"smtpHost"} required />
                </div>
              </div>
              <div className="col-span-1">
                <div className="form-field required">
                  <label htmlFor={"smtpPort"}>Port</label>
                  <input type="number" id={"smtpPort"} required />
                </div>
              </div>

              <div className="col-lg-12" />
            </div>

            <div className="flex items-end justify-end">
              <button type="submit" className="tbtn-primary btn btn-expanded">
                <span className="txt">Save changes</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
