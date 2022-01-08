import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

/* Main */
import AppLayout from './views/main/AppLayout';
import Home from './views/main/Home';
import About from './views/main/about/About';
import AboutManager from './views/main/about/AboutManager';
import History from './views/main/about/History';
import Notice from './views/main/notice/Notice';
import Notices from './views/main/notice/NoticeDetail';
import News from './views/main/notice/News';
import Board from './views/main/tavy/Board';
import Photos from './views/main/tavy/Photos';
import Apply from './views/main/apply/Apply';
import ApplyForm from './views/main/apply/ApplyForm';
import ApplyCheck from './views/main/apply/ApplyCheck';
import ApplyResult from './views/main/apply/ApplyResult';
import QnA from './views/main/qna/QnA';
import FAQ from './views/main/qna/FAQ';
import DisplayAnswers from './views/main/qna/Display';

/* Admin */
import AdminLayout from './views/admin/AdminLayout';
// Notice
import AdminNotice from './views/admin/notice/notice/AdminNotice';
import AdminNoticeDetail from './views/admin/notice/notice/AdminNoticeDetail';
import AdminNoticeCreate from './views/admin/notice/notice/AdminNoticeCreate';
// News
import AdminNews from './views/admin/notice/news/AdminNews';
import AdminNewsCreate from './views/admin/notice/news/AdminNewsCreate';
import AdminNewsDetail from './views/admin/notice/news/AdminNewsDetail';
import AdminHome from './views/admin/home/AdminHome';
// About_Tave
import AdminAbout from './views/admin/about/about_tave/AdminAbout';
import AdminAboutCreate from './views/admin/about/about_tave/AdminAboutCreate';
import AdminAboutUpdate from './views/admin/about/about_tave/AdminAboutUpdate';
// About_Admin
import AdminAboutManager from './views/admin/about/about_admin/AdminAboutManager';
import AdminAboutManagerCreate from './views/admin/about/about_admin/AdminAboutManagerCreate';
// About_History
import AdminHistory from './views/admin/about/about_history/AdminHistory';
import AdminHistoryCreate from './views/admin/about/about_history/AdminHistoryCreate';
// ActivityReview
import AdminReview from './views/admin/activity/review/AdminReview';
import AdminReviewCreate from './views/admin/activity/review/AdminReviewCreate';
import AdminReviewDetail from './views/admin/activity/review/AdminReviewDetail';
// ActivityPictures
import AdminPictures from './views/admin/activity/pictures/AdminPictures';
import AdminPicturesCreate from './views/admin/activity/pictures/AdminPicturesCreate';
import AdminPicturesDetail from './views/admin/activity/pictures/AdminPicturesDetail';
// Faq
import AdminFaq from './views/admin/qna/faq/AdminFaq';
import AdminFaqCreate from './views/admin/qna/faq/AdminFaqCreate';
import AdminFaqDetail from './views/admin/qna/faq/AdminFaqDetail';
// Qna
import AdminQna from './views/admin/qna/qna/AdminQna';
import AdminQnaCreate from './views/admin/qna/qna/AdminQnaCreate';
import AdminQnaDetail from './views/admin/qna/qna/AdminQnaDetail';
// Apply
import AdminApply from './views/admin/apply/AdminApply';
import AdminApplyCheck from './views/admin/apply/AdminApplyCheck';
import AdminApplyForm from './views/admin/apply/AdminApplyForm';
import AdminApplyResult from './views/admin/apply/AdminApplyResult';

function App() {
    return (
        <div>
            <div className="App">
                <Routes>
                    {/* Admin */}
                    <Route path="/admin" element={<AdminLayout />}>
                        {/* Home */}
                        <Route path="" element={<AdminHome />} />
                        {/* About */}
                        <Route path="about" element={<AdminAbout />} />
                        <Route
                            path="about/create"
                            element={<AdminAboutCreate />}
                        />
                        <Route
                            path="about/update"
                            element={<AdminAboutUpdate />}
                        />
                        <Route
                            path="about/history"
                            element={<AdminHistory />}
                        />
                        <Route
                            path="about/history/create"
                            element={<AdminHistoryCreate />}
                        />
                        <Route
                            path="about/manager"
                            element={<AdminAboutManager />}
                        />
                        <Route
                            path="about/manager/create"
                            element={<AdminAboutManagerCreate />}
                        />
                        {/* Notice */}
                        <Route path="notice" element={<AdminNotice />} />
                        <Route
                            path="notice/:id"
                            element={<AdminNoticeDetail />}
                        />
                        <Route
                            path="notice/create"
                            element={<AdminNoticeCreate />}
                        />
                        <Route path="news" element={<AdminNews />} />
                        <Route
                            path="news/create"
                            element={<AdminNewsCreate />}
                        />
                        <Route path="news/:id" element={<AdminNewsDetail />} />
                        {/* Activity */}
                        <Route path="review" element={<AdminReview />} />
                        <Route
                            path="review/create"
                            element={<AdminReviewCreate />}
                        />
                        <Route
                            path="review/:id"
                            element={<AdminReviewDetail />}
                        />
                        <Route path="pictures" element={<AdminPictures />} />
                        <Route
                            path="pictures/create"
                            element={<AdminPicturesCreate />}
                        />
                        <Route
                            path="pictures/:id"
                            element={<AdminPicturesDetail />}
                        />
                        <Route path="photo" element={<Photos />} />
                        {/* Apply */}
                        <Route path="apply" element={<AdminApply />} />
                        <Route path="apply/form" element={<AdminApplyForm />} />
                        <Route
                            path="apply/check"
                            element={<AdminApplyCheck />}
                        />
                        <Route
                            path="apply/result"
                            element={<AdminApplyResult />}
                        />
                        {/* qna */}
                        <Route path="qna" element={<AdminQna />} />
                        <Route
                            path="qna/:id/create"
                            element={<AdminQnaCreate />}
                        />
                        <Route path="qna/:id" element={<AdminQnaDetail />} />
                        <Route path="faq" element={<AdminFaq />} />
                        <Route path="faq/create" element={<AdminFaqCreate />} />
                        <Route path="faq/:id" element={<AdminFaqDetail />} />
                    </Route>

                    {/* Main */}
                    <Route path="/" element={<AppLayout />}>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/about/tave" element={<About />} />
                        <Route
                            exact
                            path="/about/manager"
                            element={<AboutManager />}
                        />
                        <Route
                            exact
                            path="/about/history"
                            element={<History />}
                        />

                        {/* 공지사항목록, 세부내용 */}
                        <Route exact path="/notice" element={<Notice />} />
                        <Route
                            exact
                            path="/notice/:noticeID"
                            element={<Notices />}
                        />

                        <Route exact path="/news" element={<News />} />
                        <Route exact path="/board" element={<Board />} />
                        <Route exact path="/photo" element={<Photos />} />
                        <Route exact path="/apply" element={<Apply />} />
                        <Route
                            exact
                            path="/apply/form"
                            element={<ApplyForm />}
                        />
                        <Route
                            exact
                            path="/apply/check"
                            element={<ApplyCheck />}
                        />
                        <Route
                            exact
                            path="/apply/result"
                            element={<ApplyResult />}
                        />

                        {/* QnA목록,답변들 */}
                        <Route exact path="/qna" element={<QnA />} />
                        <Route
                            exact
                            path="/qna/:questionID"
                            element={<DisplayAnswers />}
                        />

                        <Route exact path="/faq" element={<FAQ />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
