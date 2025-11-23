import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  likeCount: number = 0;
  private likeCountListener?: (event: Event) => void;

  ngOnInit(): void {
    // Initialize like count from storage
    const storedCount = localStorage.getItem('likeCount');
    if (storedCount) {
      this.likeCount = parseInt(storedCount, 10);
    }

    // Listen for like count updates from footer MFE
    this.likeCountListener = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.count !== undefined) {
        this.likeCount = customEvent.detail.count;
      }
    };
    window.addEventListener('likeCountUpdated', this.likeCountListener);
  }

  ngOnDestroy(): void {
    if (this.likeCountListener) {
      window.removeEventListener('likeCountUpdated', this.likeCountListener);
    }
  }
}
