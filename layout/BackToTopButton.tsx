import React, { useState, useEffect } from 'react';

// Component ScrollToTop
const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Hàm để xử lý sự kiện cuộn
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Hàm để cuộn trang lên đầu
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Cuộn mượt mà
        });
    };

    // Thêm sự kiện lắng nghe cuộn khi component được mount và xóa khi unmount
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <button onClick={scrollToTop} className="scroll-button" aria-label="Scroll to top">
                    ↑
                </button>
            )}
            <style jsx>{`
                .scroll-to-top {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                }

                .scroll-button {
                    background-color: #007cbf;
                    border: none;
                    border-radius: 50%;
                    color: white;
                    width: 50px;
                    height: 50px;
                    font-size: 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    transition: background-color 0.3s, transform 0.3s;
                }

                .scroll-button:hover {
                    background-color: #005f8f;
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default ScrollToTop;
